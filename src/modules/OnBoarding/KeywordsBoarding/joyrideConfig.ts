import { Props as JoyrideProps, Step } from "react-joyride";
import theme from "src/config/theme.json";
import { ElementClassesName } from "src/constants/ElementClassesName";
import { ElementIdsType } from "src/constants/ElementIdsType";

const defaultStyles = {
  arrowColor: "#fff",
  backgroundColor: "#fff",
  beaconSize: 36,
  overlayColor: "rgba(0, 0, 0, 0.5)",
  primaryColor: theme["primary-color"],
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  width: undefined,
  zIndex: 100,
};

const keywordsClassname: ElementClassesName = "keyword";
const keywordsListId: ElementIdsType = "keyword-list";
const keywordEditorId: ElementIdsType = "keyword-editor";

export const steps: Step[] = [
  {
    target: `#${keywordsListId}`,
    content:
      "This is where you create and maintain keywords for your bot. Keywords are a way to quickly define keywords for the words that your bot has to understand. You can link these keywords to your intents in  the intent settings.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: `#${keywordsListId}`,
    content: "We've already made a keyword to get you started. Let's take a look!",
  },
  {
    target: `.${keywordsClassname}:first-child`,
    content: "Click to open the keyword.",
    spotlightClicks: true,
    styles: {
      // @ts-ignore
      tooltipFooter: {
        opacity: 0,
      },
      // @ts-ignore
      buttonClose: {
        display: "none",
      },
    },
  },
  {
    target: `#${keywordEditorId}`,
    content:
      'We\'ve made a number of keywords for the word "Chatbot". With this example, if any of these keywords is mentioned by the user, the bot will understand the user is referring to a chatbot and trigger the correct intent.',
  },
  {
    target: `#${keywordEditorId}`,
    content:
      "You can also add keywords in a batch to make adding them even faster. By creating tags and defining their keywords, your bot will have a much higher chance of correctly recognizing the user input and have the best possible user experience.",
  },
];

export const defaultProps: JoyrideProps = {
  continuous: true,
  run: false,
  showSkipButton: true,
  showProgress: true,
  steps,
  locale: {
    last: "Close",
  },
  styles: {
    options: defaultStyles,
  },
  stepIndex: 0,
};
