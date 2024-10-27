import { SurveyService } from '@/backend/services/survey';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
     try{
          const sID = (await cookies()).get('sID');
          if(sID){
               throw Error('E_SID_EXISTS');
          }
          const survey = await SurveyService.createSurvey(await request.json());
          (await cookies()).set('sID',survey.uuid);
          return new NextResponse(null,{status: 200});
     }catch(e){
          let errorMsg;
          if(e instanceof Error){
               if(e.message === 'E_SID_EXISTS'){
                    errorMsg = 'Survey already filled';
                    return NextResponse.json({'error':errorMsg},{status: 403})
               }
          }
          return NextResponse.json({'error':'Some error occurred'},{status: 500})
     }
}
