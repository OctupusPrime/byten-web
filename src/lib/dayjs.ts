import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";

import("dayjs/locale/en");
import("dayjs/locale/uk");
import("dayjs/locale/ru");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

export default dayjs;
