export function padString(n: string, width: number, z = '0') {
  if (n.length >= width) {
    return n;
  }
  return new Array(width - n.length + 1).join(z) + n;
}

export function capitalizeString(s: string) {
  if (!!s && s.length > 0) {
    return s[0]?.toUpperCase() + s.slice(1);
  }
  return '';
}
