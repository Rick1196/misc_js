document.addEventListener("DOMContentLoaded", () => {
  let dragSrcE = null;
  function handleDragStart(e) {
    this.style.opacity = "0.4";
    dragSrcE = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragEnd(e) {
    this.style.opacity = "1";
  }

  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = "1";
    document.querySelectorAll(".item").forEach((element) => {
      element.classList.remove("over");
    });
  }

  function handleDragEnter(e) {
    this.classList.add("over");
  }

  function handleDragLeave(e) {
    this.classList.remove("over");
  }
  function handleDropE(e) {
    e.stopPropagation();
    console.log("handle drop");
    if (dragSrcE !== this) {
      dragSrcE.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }
    return false;
  }
  const buildGrid = () => {
    const box = document.getElementById("box");
    for (let i = 0; i < 9; i++) {
      const item = document.createElement("div");
      item.innerHTML = `${i}`;
      item.classList.add("item");
      item.setAttribute("draggable", true);
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("dragover", handleDragOver);
      item.addEventListener("dragend", handleDragEnd);
      item.addEventListener("dragenter", handleDragEnter);
      item.addEventListener("dragleave", handleDragLeave);
      item.addEventListener("drop", handleDropE);

      box.appendChild(item);
    }
  };
  const getDeviceBattery = () => {
    try{
      navigator.getBattery().then((batteryData) => {
        console.log(batteryData);
      }).catch((error) =>{
        console.log("Not avilable")
      });
    }catch(error){
      const element = document.getElementById("battery");
      element.innerHTML = "100%"
    }
    
  };
  const getTime = () =>{
    const systemDate = new Date()
    const systemTime = `${systemDate.getHours()}:${systemDate.getMinutes()}`
    const element = document.getElementById("time");
    element.innerHTML = systemTime; 
  }
  buildGrid();
  getDeviceBattery();
  getTime();
  setInterval(getTime, 5000)
});
