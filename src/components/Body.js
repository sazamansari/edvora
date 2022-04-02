import {
  Icon,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Select,
  Spinner,
} from "@chakra-ui/react";
import styles from "../../styles/Body.module.css";
import CustomTab from "./CustomTab";
import { BsFilterLeft } from "react-icons/bs";
import BodyItem from "./BodyItem";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  getCitiesByState,
  getPastRides,
  getRides,
  getStates,
  getUpcomingRides,
  sortedRides,
} from "../util";

function Body({ userStationCode }) {
  const [rides, setRides] = useState();
  const [currentState, setCurrentState] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch("https://assessment.api.vweb.app/rides")
      ).json();
      setRides(sortedRides(response, userStationCode));
    })();
  }, []);

  if (rides === undefined) {
    return (
      <div className={styles.loader}>
        <Spinner color="white" />;
      </div>
    );
  }

  const upcoming = getRides(getUpcomingRides(rides), currentState, currentCity);
  const past = getRides(getPastRides(rides), currentState, currentCity);
  const states = getStates(rides);

  return (
    <div className={styles.bodymain}>
      <Tabs>
        <TabList color="#d0cbcb" borderBottom="none">
          <CustomTab title="Nearest Rides" />
          <CustomTab title={`Upcoming Rides (${upcoming.length})`} />
          <CustomTab title={`Past Rides (${past.length})`} />
          <div className={styles.filter}>
            <Icon mr="8px" as={BsFilterLeft} />
            <Popover>
              <PopoverTrigger>
                <span>Filters</span>
              </PopoverTrigger>
              <PopoverContent w="200px" p="10px 30px 10px 30px" bg="#131313">
                <PopoverHeader color="#A5A5A5">Filters</PopoverHeader>
                <PopoverBody p={0}>
                  <Select
                    onChange={(e) => {
                      setCurrentState(e.target.value);
                      setCurrentCity("");
                    }}
                    value={currentState}
                    icon={<MdArrowDropDown />}
                    mt="10px"
                    bg="#232323"
                    variant="filled"
                    placeholder="State"
                  >
                    {states.map((state, key) => (
                      <option key={key} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                  <Select
                    onChange={(e) => setCurrentCity(e.target.value)}
                    value={currentCity}
                    icon={<MdArrowDropDown />}
                    mt="10px"
                    bg="#232323"
                    variant="filled"
                    placeholder="City"
                  >
                    {currentState !== ""
                      ? getCitiesByState(rides, currentState).map(
                          (city, key) => <option key={key}>{city}</option>
                        )
                      : null}
                  </Select>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </TabList>
        <TabPanels mt="24px" color="#fff">
          <TabPanel p={0}>
            {getRides(rides, currentState, currentCity).map((ride, key) => (
              <div key={key}>
                <BodyItem ride={ride} />
              </div>
            ))}
          </TabPanel>
          <TabPanel p={0}>
            {upcoming.map((ride, key) => (
              <div key={key}>
                <BodyItem ride={ride} />
              </div>
            ))}
          </TabPanel>
          <TabPanel p={0}>
            {past.map((ride, key) => (
              <div key={key}>
                <BodyItem ride={ride} />
              </div>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Body;
