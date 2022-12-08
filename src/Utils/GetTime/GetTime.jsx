const GetTime = () => {
  const timeOfDay = new Date();
  if (timeOfDay.getHours() < 12) {
    return "morning";
  } else if (timeOfDay.getHours() < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
};

export default GetTime;
