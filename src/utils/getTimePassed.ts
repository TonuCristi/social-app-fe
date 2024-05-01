export function getTimePassed(time: string) {
  return Date.now() - new Date(time).getTime() - 3_600_000;
}
