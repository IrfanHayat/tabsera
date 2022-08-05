import { Wrapper } from "@googlemaps/react-wrapper";
import Locker from "../../container/Locker"

export default function lockerMap() {
    return (
        <Wrapper apiKey={"AIzaSyD6TYKBCQF2vzPj59neEeUFcPdwvEqeu2A"}>
            <Locker />
        </Wrapper>
    )

}
