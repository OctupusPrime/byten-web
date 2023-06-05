function humanFileSize(size: number): string {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  var adjustedSize = size / Math.pow(1024, i);

  var sizeStr = Number.isInteger(adjustedSize)
    ? adjustedSize.toString()
    : adjustedSize.toFixed(2);

  return sizeStr + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

function getFileSize(str: string): number {
  const sizeInBytes = new Blob([str]).size;

  return sizeInBytes;
}

export { getFileSize, humanFileSize };
