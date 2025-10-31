import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type TPropTimer = {
  endDate: Date;
};
const TimerCountDown = ({ endDate }: TPropTimer) => {
  const [time, setTime] = useState<number | null>(null); // 👈 ban đầu null (chưa có countdown)
  useEffect(() => {
    const updateTimer = () => {
      const diff = endDate.getTime() - Date.now();
      setTime(diff > 0 ? diff : 0);
    };

    updateTimer(); // cập nhật lần đầu
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  function convertMsToTime(ms: number) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  }

  const countDown = time !== null ? convertMsToTime(time) : null;
  console.log("timer", time, countDown);
  return (
    <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
      <Typography color="error" fontWeight={600}>
        {countDown
          ? `${countDown.hours.toString().padStart(2, "0")}h : ${countDown.minutes
              .toString()
              .padStart(2, "0")}m : ${countDown.seconds.toString().padStart(2, "0")}s`
          : "--h : --m : --s"}
      </Typography>
    </Box>
  );
};

export default TimerCountDown;
