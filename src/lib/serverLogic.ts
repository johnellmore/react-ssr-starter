export function generateRandomNumber() {
  console.log("this is running on the server!");
  console.log("cpu usage", process.cpuUsage());
  return Math.floor(Math.random() * 100);
}
