import { scroller, Events } from "react-scroll";

export const smoothScrollTo = (targetId, containerId) => {
  Events.scrollEvent.remove("begin");
  Events.scrollEvent.remove("end");

  scroller.scrollTo(targetId, {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    containerId: containerId,
    offset: 0,
  });
};
