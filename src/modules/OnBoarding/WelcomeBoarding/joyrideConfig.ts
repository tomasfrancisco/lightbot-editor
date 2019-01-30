import { Props as JoyrideProps, Step } from "react-joyride";
import theme from "src/config/theme.json";
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

const sideMenuId: ElementIdsType = "side-menu";
const intentListId: ElementIdsType = "intent-list";
const welcomeIntentId: ElementIdsType = "welcome-intent";
const intentEditorId: ElementIdsType = "intent-editor";
const intentEditorTriggersId: ElementIdsType = "intent-editor-triggers";
const intentEditorOutputsId: ElementIdsType = "intent-editor-outputs";

export const steps: Step[] = [
  {
    target: `body`,
    content:
      "Welcome to Lightbot! We'd like to show you the basics of making a chatbot. You can skip this tutorial at any time using the skip button.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: `#${sideMenuId}`,
    content:
      "This is where you'll find all the settings of your bot. Build your bot by creating intents, launch your bot with the integration widget and improve your bot with quick fixes based on real user data.",
    placement: "right",
  },
  {
    target: `#${intentListId}`,
    content:
      "Here you'll find a list of all of your bot's intents. Intents are the subjects that your bot will respond to. You can create new intents by clicking the Add Intent button.",
  },
  {
    target: `#${intentListId}`,
    content:
      "There are three types of intents you can set: a normal intent, a fallback intent, which will be used when the bot does not recognize the input and a welcome intent, which will show when the user opens the bot first-time.",
  },
  {
    target: `#${intentListId}`,
    content:
      "You can also create follow-up intents, these are intents that show after the main intent has been triggered. You can do this by simply dragging an intent under another and move it to the right.",
  },
  {
    target: `#${intentListId}`,
    content:
      "Bots always start with a welcome intent, which is an introductory message that shows when users open your bot. We've already created one for you. Let's check it out!",
  },
  {
    target: `#${welcomeIntentId}`,
    content: "Click to open the intent.",
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
    target: `#${intentEditorId}`,
    content:
      "This is where the magic happens. Set your intent to your liking using a simple but powerful two-way interaction structure.",
    placement: "left",
  },
  {
    target: `#${intentEditorTriggersId}`,
    content:
      "This is where you'll define what commands the user can say to trigger this intent. Since this is a welcome intent, you don't have to define triggers here.",
  },
  {
    target: `#${intentEditorOutputsId}`,
    content:
      "And finally this is where you define all the outputs of your intent, this is what the user will see when talking to your bot. You can add text, links and buttons. Happy creating!",
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
