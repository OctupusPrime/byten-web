import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";

// import "dayjs/locale/uk";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

// dayjs.locale("uk");

export default dayjs;
