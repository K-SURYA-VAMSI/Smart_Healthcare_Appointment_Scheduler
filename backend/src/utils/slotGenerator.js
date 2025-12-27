export const generateSlots = (
    startTime,
    endTime,
    duration,
    breaks = []
  ) => {
    const slots = [];
  
    const toMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };
  
    let current = toMinutes(startTime);
    const end = toMinutes(endTime);
  
    while (current + duration <= end) {
      const slotStart = current;
      const slotEnd = current + duration;
  
      const isInBreak = breaks.some(b => {
        const bStart = toMinutes(b.startTime);
        const bEnd = toMinutes(b.endTime);
        return slotStart < bEnd && slotEnd > bStart;
      });
  
      if (!isInBreak) {
        slots.push({
          startTime: `${String(Math.floor(slotStart / 60)).padStart(2, "0")}:${String(slotStart % 60).padStart(2, "0")}`,
          endTime: `${String(Math.floor(slotEnd / 60)).padStart(2, "0")}:${String(slotEnd % 60).padStart(2, "0")}`
        });
      }
  
      current += duration;
    }
  
    return slots;
  };

  