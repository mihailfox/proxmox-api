#!/usr/bin/env python3
"""Decode a base64 value and write it to a file."""

from __future__ import annotations

import argparse
import base64
import os
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument(
        "--value",
        help="Base64 value to decode.",
    )
    source.add_argument(
        "--env", help="Name of the environment variable that stores the base64 value."
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Destination file path for the decoded bytes.",
    )
    return parser.parse_args()


def resolve_value(value: str | None, env: str | None) -> str:
    if value:
        return value
    if env:
        resolved = os.getenv(env, "")
        if not resolved:
            raise ValueError(f"Environment variable '{env}' is empty or undefined.")
        return resolved
    raise ValueError("No base64 value provided.")


def main() -> None:
    args = parse_args()
    encoded = resolve_value(args.value, args.env)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(base64.b64decode(encoded))


if __name__ == "__main__":
    main()
