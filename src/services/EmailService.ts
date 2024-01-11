const baseLink = (process.env.NODE_ENV === 'production') ? 'https://framework-shf.vercel.app/' : 'http://localhost:5173';

const startSurveyEmailTemplate = (ecosystemName: string, ecosystemId: string, language: string) => {

  const messageText: Record<string, { greeting: string, surveyMessage: string, linkText: string, endText: string }> = {
    pt_br: {
      greeting: 'Olá!',
      surveyMessage: `Uma pesquisa para o ecossistema ${ecosystemName} começou!`,
      linkText: 'clique aqui',
      endText: 'para responder a pesquisa.',
    },
    en: {
      greeting: 'Hi there!',
      surveyMessage: `A survey for the ecosystem ${ecosystemName} has started!`,
      linkText: 'here',
      endText: 'to answer the survey.',
    }
  };

  return `
    <html>
      <body>
        <h1>${messageText[language].greeting}</h1>
        <p>${messageText[language].surveyMessage}</p>
        <p>${messageText[language].linkText} <a href="${baseLink}/ecos-survey/${ecosystemId}">${messageText[language].linkText}</a> ${messageText[language].endText}</p>
      </body>
    </html>
  `;
};

const endRoundEmailTemplate = (ecosystemName: string, ecosystemId: string, language: string) => {

  const messageText: Record<string, { greeting: string, surveyMessage: string, linkText: string, endText: string }> = {
    pt_br: {
      greeting: 'Olá!',
      surveyMessage: `A pesquisa para o ecossistema ${ecosystemName} terminou!`,
      linkText: 'clique aqui',
      endText: 'para responder ver os resultados.',
    },
    en: {
      greeting: 'Hi there!',
      surveyMessage: `The survey for the ecosystem ${ecosystemName} has has ended!`,
      linkText: 'here',
      endText: 'to see the results.',
    }
  };

  return `
    <html>
      <body>
        <h1>${messageText[language].greeting}</h1>
        <p>${messageText[language].surveyMessage}</p>
        <p>${messageText[language].linkText} <a href="${baseLink}/ecos-dashboard/${ecosystemId}">${messageText[language].linkText}</a> ${messageText[language].endText}</p>
      </body>
    </html>
  `;
};

export default class EmailService {
  private static readonly API_URL = 'https://shf-tool-api.fly.dev';

  public static notifyStartSurvey(email: string, ecosystemName: string, ecosystemId: string, language: string): void {
    fetch(`${this.API_URL}/delphi-round/notify-start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // cors
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        to: email,
        message: startSurveyEmailTemplate(ecosystemName, ecosystemId, language),
      }),
    });
  }

  public static scheduleEndRound(email: string, endAt: string, ecosystemName: string, ecosystemId: string, language: string): void {
    fetch(`${this.API_URL}/delphi-round/schedule-end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        to: email,
        message: endRoundEmailTemplate(ecosystemName, ecosystemId, language),
        endAt,
      }),
    }).then((data) => console.log(data.json())).catch((error) => console.log(error));
  }
}