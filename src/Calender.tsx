import { useEffect, useRef, useState } from "react";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
  id: string;
  title: string;
}

interface EventData extends Event {
  evtId: string;
  description: string;
  date: string;
}

const StyledComponent = styled.div`
  .fc {
    height: 30rem;
    width: full;
  }
  .fc td {
    background: #333;
    border: none;
    color: #f4f4f4;
  }

  .fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-button-primary {
    background: transparent;
    background-image: none;
    border: none;
  }

  .fc .fc-col-header-cell {
    background: #333;
    padding: 0;
    color: #f4f4f4;
    border: none;
    font-weight: 500;
    padding: 1rem 0;
  }

  .fc .fc-header-toolbar {
    background: #333;
    color: #f4f4f4;
    margin-bottom: 0;
    border: none;
  }

  .fc table {
    border: none;
  }

  .fc .fc-daygrid-day-frame {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.3rem;
  }

  .fc .fc-daygrid-event-harness {
    border: none;
  }

  .fc .fc-event-main {
    height: 3rem;
    width: 3rem;
    background: transparent;
    border-radius: 50%;
    border: 2px solid red;
    color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }

  .fc .fc-daygrid-day-number {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -13%);
  }
`;

const EventCard = styled.div`
  .event-card {
    position: absolute;
    z-index: 2;
    padding: 1rem;
    transform: translate(1rem, 2rem);
    background-color: #ccc;
    border-radius: 10px;
    box-shadow: 0 0 5px 9px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }
`;

const EventContent = () => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <h2>This is an event</h2>
      <p>This is the event info</p>
    </div>
  );
};

const Calender = () => {
  const [events] = useState<Event[]>([
    {
      id: "11",
      title: "Project 1",
    },
    {
      id: "12",
      title: "Project 2",
    },
  ]);
  const [checks, setChecks] = useState(new Array(events.length).fill(false));
  const [checkedEvts, setCheckedEvts] = useState<Event[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [eventData, setEventData] = useState<EventData[]>([
    {
      id: "1",
      evtId: "11",
      title: "Project 1",
      description: "Initial discussion about the project-1",
      date: "2021-12-20",
    },
    {
      id: "2",
      evtId: "12",
      title: "Project 2",
      description: "Deal with the client for project-2",
      date: "2021-12-25",
    },
    {
      id: "3",
      evtId: "11",
      title: "Project 1",
      description: "Getting paid from project-1",
      date: "2021-12-05",
    },
    {
      id: "4",
      evtId: "12",
      title: "Project 2",
      date: "2021-12-14",
      description: "Finalizing project-2",
    },
  ]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>(eventData);
  const [clickedEvt, setEvt] = useState<{ title: string; description: string }>(
    {
      title: "",
      description: "",
    }
  );
  const [eventCardPosition, setEventCardPos] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [openEvtCard, setEvtCard] = useState(false);
  const [evtInfo, setEvtInfo] = useState<EventClickArg>();
  const calenderRef = useRef<FullCalendar>(null);

  const onSelectEvents = (evtChecks: boolean[]) => {
    const evts = events.filter((event, i) => evtChecks[i] && event);
    const selectedEvts = evts.filter((evt) => evt !== null);
    setChecks(evtChecks);
    const filteredEvts = selectedEvts.flatMap((evt) =>
      eventData.filter((event) => event.evtId === evt.id)
    );
    setFilteredEvents(filteredEvts);
  };

  const checkEvent = (index: number) => {
    const updatedChecks = checks.map((check, i) =>
      i === index ? !check : check
    );
    onSelectEvents(updatedChecks);
  };

  const onClickEvent = (evt: EventClickArg) => {
    const xPos = evt.jsEvent.clientX;
    const yPos = evt.jsEvent.clientY;

    setEvt({
      title: evt?.event?.title || "",
      description: evt.event.extendedProps.description || "",
    });
    // console.log(evt.el);
    setEventCardPos({ x: xPos, y: yPos });
    setEvtInfo(evt);
    console.log(xPos, yPos);
    setEvtCard(true);
  };

  const manipulateCheck = (checked: boolean) => {
    let evtChecks;
    if (checked) {
      evtChecks = checks.map(() => true);
    } else {
      evtChecks = checks.map(() => false);
    }
    onSelectEvents(evtChecks);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (evtInfo && evtInfo.el.classList.contains(".fc-daygrid-event")) {
        // console.log(evtInfo.el);
      } else {
        console.log("hello");
      }
    });
  }, [eventData, events, filteredEvents, openEvtCard, evtInfo]);

  useEffect(() => {
    console.log(eventCardPosition);
  }, [eventCardPosition]);

  return (
    <StyledComponent>
      {openEvtCard && (
        <EventCard>
          <div
            className="event-card"
            style={{
              transform: `translate(${
                eventCardPosition.x > 1300
                  ? eventCardPosition.x - 250
                  : eventCardPosition.x
              }px, ${eventCardPosition.y}px)`,
            }}
          >
            <h2 style={{ fontSize: "18px" }}>Selected Event:</h2>
            <div>
              <span style={{ fontWeight: "bold" }}>Title:</span>
              <span>{clickedEvt.title}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Description:</span>
              <span>{clickedEvt.description}</span>
            </div>
          </div>
        </EventCard>
      )}
      <FullCalendar
        ref={calenderRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        // eventContent={EventContent}
        eventColor="red"
        // eventDisplay="inverse-background"
        displayEventTime={true}
        eventClick={onClickEvent}
        // weekends={false}
        // eventDidMount={(info) => console.log(info.event.extendedProps)}
        dateClick={() => setEvtCard(true)}
        // editable
        events={filteredEvents}
      />
      <div>
        <h2>Filter</h2>
        <div>
          <div>
            <input
              type="checkbox"
              name="projects"
              // checked={selectAll}
              onChange={(e) => manipulateCheck(e.currentTarget.checked)}
            />
            <label
              htmlFor="projects"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Projects
            </label>
          </div>
          <ul style={{ marginLeft: "0.6rem" }}>
            {events.map((event, i) => (
              <li key={event.id} style={{ padding: "0.6rem 0" }}>
                <input
                  type="checkbox"
                  name="project-1"
                  checked={checks[i]}
                  onChange={() => checkEvent(i)}
                />
                <label htmlFor="checkbox">{event.title}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StyledComponent>
  );
};

export default Calender;
