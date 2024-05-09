export function getTimePassed(time: string) {
  const timePassed = (Date.now() - new Date(time).getTime()) / 1000 / 60;

  // More than 2 years
  if (timePassed / 60 / 24 / 31 / 12 >= 2)
    return `${Math.trunc(timePassed / 60 / 24 / 31 / 12)} years ago`;

  // 1 year
  if (timePassed / 60 / 24 / 31 / 12 >= 1 && timePassed / 60 / 24 / 31 / 12 < 2)
    return `${Math.trunc(timePassed / 60 / 24 / 31 / 12)} year ago`;

  // Between 2 months and 12 months
  if (timePassed / 60 / 24 / 31 >= 2 && timePassed / 60 / 24 / 31 < 12)
    return `${Math.trunc(timePassed / 60 / 24 / 31)} months ago`;

  // 1 month
  if (timePassed / 60 / 24 / 31 >= 1 && timePassed / 60 / 24 / 31 < 2)
    return `${Math.trunc(timePassed / 60 / 24 / 31)} month ago`;

  // 4 weeks
  if (timePassed / 60 / 24 >= 28 && timePassed / 60 / 24 < 29)
    return `4 weeks ago`;

  // 3 weeks
  if (timePassed / 60 / 24 >= 21 && timePassed / 60 / 24 < 22)
    return `3 weeks ago`;

  // 2 weeks
  if (timePassed / 60 / 24 >= 14 && timePassed / 60 / 24 < 15)
    return `2 weeks ago`;

  // 1 week
  if (timePassed / 60 / 24 >= 7 && timePassed / 60 / 24 < 8)
    return `1 week ago`;

  // Between 2 days and 31 days
  if (timePassed / 60 / 24 >= 2 && timePassed / 60 / 24 < 31)
    return `${Math.trunc(timePassed / 60 / 24)} days ago`;

  // 1 day
  if (timePassed / 60 / 24 >= 1 && timePassed / 60 / 24 < 2)
    return `${Math.trunc(timePassed / 60 / 24)} day ago`;

  // Between 2 hours and 24 hours
  if (timePassed / 60 >= 2 && timePassed / 60 <= 24)
    return `${Math.trunc(timePassed / 60)} hours ago`;

  // 1 hour
  if (timePassed / 60 >= 1 && timePassed / 60 < 2)
    return `${Math.trunc(timePassed / 60)} hour ago`;

  // Between 1 minute and 60 minutes
  if (timePassed >= 2 && timePassed <= 60) {
    return `${Math.trunc(timePassed)} minutes ago`;
  }

  if (timePassed >= 1 && timePassed < 2) {
    return `${Math.trunc(timePassed)} minute ago`;
  }

  // Under 1 minute
  if (timePassed < 1) return `Just now`;
}
