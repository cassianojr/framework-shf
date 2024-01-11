const baseLink = (process.env.NODE_ENV === 'production') ? 'https://framework-shf.vercel.app/' : 'http://localhost:5173';

export const startSurveyEmailTemplate = (ecosystemName: string, ecosystemId: string) => `
  <html>
    <body>
      <h1>Hi there!</h1>
      <p>A survey for the ecosystem ${ecosystemName} has started!</p>
      <p>Click <a href="${baseLink}/ecos-survey/${ecosystemId}">here</a> to answer the survey.</p>
    </body>
  </html>
`;

export const endRoundEmailTemplate = (ecosystemName: string, ecosystemId: string) => `
  <html>
    <body>
      <h1>Hi there!</h1>
      <p>The survey for the ecosystem ${ecosystemName} has ended!</p>
      <p>Click <a href="${baseLink}/ecos-dashboard/${ecosystemId}">here</a> to see the results.</p>
    </body>
  </html>

`;

export default class EmailService{
  private static readonly API_URL = 'https://shf-tool-api.fly.dev';

  public static notifyStartSurvey(email: string, ecosystemName: string, ecosystemId: string): void {
    fetch(`${this.API_URL}/delphi-round/notify-start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // cors
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        to: email,
        message: startSurveyEmailTemplate(ecosystemName, ecosystemId),
      }),
    });    
  }

  public static scheduleEndRound(email: string, endAt: string, ecosystemName: string, ecosystemId: string) : void{
    fetch(`${this.API_URL}/delphi-round/schedule-end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        to: email,
        message: endRoundEmailTemplate(ecosystemName, ecosystemId),
        endAt,
      }),
    }).then((data)=>console.log(data.json())).catch((error)=>console.log(error));
  }
}