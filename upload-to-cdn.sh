#!/bin/bash
API_KEY="sk_cdn_71798cb4ed22cfd1a5280c785f8ea04d2e3a26f83f9f48a04cd769a93f0185d7"
MANIFEST="src/data/cdnManifest.json"
mkdir -p src/data

echo "{" > "$MANIFEST"
FIRST=true

upload_file() {
  local file="$1"
  local basename=$(basename "$file")
  local response=$(curl -s -X POST https://cdn.hackclub.com/api/v4/upload \
    -H "Authorization: Bearer $API_KEY" \
    -F "file=@$file")
  local url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
  if [ -z "$url" ]; then
    url=$(echo "$response" | grep -o '"link":"[^"]*"' | head -1 | cut -d'"' -f4)
  fi
  if [ -z "$url" ]; then
    echo "FAILED: $basename - $response" >&2
    return 1
  fi
  echo "OK: $basename -> $url" >&2
  echo "$basename|$url"
}

export -f upload_file
export API_KEY

# Collect all media files
find public -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.mp4" -o -iname "*.mov" -o -iname "*.webm" -o -iname "*.gif" \) | sort > /tmp/cdn_files.txt

TOTAL=$(wc -l < /tmp/cdn_files.txt)
echo "Uploading $TOTAL files to cdn.hackclub.com..." >&2

# Upload with 8 parallel jobs
RESULTS=$(cat /tmp/cdn_files.txt | xargs -P 8 -I {} bash -c 'upload_file "$@"' _ {})

# Build JSON manifest
echo "{" > "$MANIFEST"
FIRST=true
while IFS='|' read -r name url; do
  if [ -n "$name" ] && [ -n "$url" ]; then
    if [ "$FIRST" = true ]; then
      FIRST=false
    else
      echo "," >> "$MANIFEST"
    fi
    printf '  "%s": "%s"' "$name" "$url" >> "$MANIFEST"
  fi
done <<< "$RESULTS"
echo "" >> "$MANIFEST"
echo "}" >> "$MANIFEST"

echo "Done! Manifest saved to $MANIFEST" >&2
