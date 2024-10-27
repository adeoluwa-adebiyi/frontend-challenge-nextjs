"use client";

import Survey from "@/components/survey";
import { surveyMachine } from "@/state/survey-machine";
import { Box, CardHeader} from "@mui/material";

export default function Home() {
  return (
    <Box>
      <h3 style={{textAlign:'center', marginTop:"40px", color:"#000"}}>MultiForm App</h3>
      <Survey machine={surveyMachine}/>
    </Box>
  );
}
