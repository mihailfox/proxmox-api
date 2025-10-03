#!/usr/bin/env python3
"""Compute the next semantic version tag for release automation."""

from __future__ import annotations

import argparse
import re
import sys

SEMVER_PATTERN = re.compile(r"^v(\d+)\.(\d+)\.(\d+)$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Compute the next semantic version tag based on the previous tag."
        )
    )
    parser.add_argument(
        "--last-tag",
        required=True,
        help="The previously published semantic version tag (e.g., v1.2.3)",
    )
    parser.add_argument(
        "--bump",
        choices=("patch",),
        default="patch",
        help="The component to bump. Only patch increments are supported.",
    )
    return parser.parse_args()


def parse_semver(tag: str) -> tuple[int, int, int]:
    match = SEMVER_PATTERN.fullmatch(tag.strip())
    if not match:
        raise ValueError(
            f"Unsupported existing tag format: {tag!r}. Expected pattern v<major>.<minor>.<patch>."
        )
    return tuple(int(part) for part in match.groups())


def bump_patch(tag: str) -> str:
    major, minor, patch = parse_semver(tag)
    patch += 1
    return f"v{major}.{minor}.{patch}"


def main() -> int:
    args = parse_args()
    try:
        if args.bump == "patch":
            print(bump_patch(args.last_tag))
    except ValueError as exc:  # pragma: no cover - defensive guard for workflow usage
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":  # pragma: no cover - script entry point
    raise SystemExit(main())
