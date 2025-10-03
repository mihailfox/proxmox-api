#!/usr/bin/env python3
"""Encode a file's contents as base64 and emit to stdout or a GitHub output file."""

from __future__ import annotations

import argparse
import base64
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--input",
        required=True,
        help="Path to the file whose contents should be encoded.",
    )
    parser.add_argument(
        "--key",
        required=False,
        help=(
            "Optional key to prefix the encoded value with, matching the"
            " `key=value` format expected by GitHub Actions outputs."
        ),
    )
    parser.add_argument(
        "--output",
        default="-",
        help=(
            "Destination path for the encoded output. Defaults to stdout."
            " When targeting GitHub outputs, pass $GITHUB_OUTPUT here."
        ),
    )
    return parser.parse_args()


def write_output(value: str, output_path: str) -> None:
    if output_path == "-":
        print(value)
        return

    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(value)
        handle.write("\n")


def main() -> None:
    args = parse_args()
    data = Path(args.input)
    if not data.is_file():
        raise FileNotFoundError(f"Input file not found: {data}")
    encoded = base64.b64encode(data.read_bytes()).decode("utf-8")
    line = encoded if not args.key else f"{args.key}={encoded}"
    write_output(line, args.output)


if __name__ == "__main__":
    main()
