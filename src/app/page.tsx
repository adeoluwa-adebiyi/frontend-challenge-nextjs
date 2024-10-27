import Survey from "../pages/survey";
import { surveyMachine } from "@/state/survey-machine";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function Home() {
  const _cookies = await cookies()
  const sID = _cookies.get('sID');
  return (
    <Box>
      <h3 style={{ textAlign: 'center', marginTop: "40px", color: "#000" }}>MultiForm App</h3>
      <Survey machine={surveyMachine} filled={sID ? true : false} />
    </Box>
  );
}
