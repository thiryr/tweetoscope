import { EditorDiv, EditHeader, WriteArea, SubmitButton, ConfirmText, HelpButton } from "./styles";
import sendTweetThread from "../../apiRequests/sendTweetThread";
import getSelf from "../../apiRequests/getSelf";
import { formatTweet } from "./services/tweetFormat";
import { dateToString } from "../../commons/utils/dateFormater";
import { useEffect, useState } from 'react';

function Editor() {

  // editor references
  const textArea = document.getElementById("editor-text-area") as HTMLInputElement; // cast because getElementById does not have value property by default in tsx
  const confArea = document.getElementById("editor-send-confirmation");
  const timeArea = document.getElementById("editor-time-area");

  // get user data
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if(!userData) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    const user: any = await getSelf();
    const data = user.data;
    setUserData(`${data.name} @${data.username}`);
  };

  // editor autocompletion
  if(textArea) {
    textArea.addEventListener("keypress", (event) => {
      let text = textArea?.value;
      // autocomplete parenthese
      if(event.key === "(") {
        text += ")"
        textArea.value = text;
        textArea.setSelectionRange(text.length-1, text.length-1);
      }
    });
  }

  // editor text submit handler
  const handleSubmit = () => {

    if(textArea && confArea) {

      if(textArea.value) {
        const formated_list: [string,string[]] = formatTweet(textArea.value);
        const tweet_thread: string[] = formated_list[1];

        // sends the tweet thread which has been formatted for twitter
        sendTweetThread(tweet_thread);

        // clear text when tweet sent
        textArea.value = "";
        // set sent confirmation message
        confArea.innerHTML = "Tweet successfully sent!";
        confArea.style.color = "#42f5aa";
      }

      else {
        // set warning message if empty text
        confArea.innerHTML = "Cannot write an empty tweet!";
        confArea.style.color = "#f56342";
      }
    }
  }

  // help display
  const showHelp = () => {

    if(textArea) {
      textArea.value = "#(This is a Title)\nTitles are used to indicate the start of a new thread.\n\n##(This is a Heading)\nHeadings are used to separate the thread into sections.\n\n###(This is a Subheading)\nSubheadings are used for subsections.\n\nYou can also write normal text, **(bold) text, and even *(italic) text!";
    }
  };

  // date updater
  setInterval(() => {

    if(timeArea) {
      let time = new Date();
      timeArea.innerHTML = dateToString(time);
    }

  }, 1000);

  return(
    <EditorDiv>
      <EditHeader>TwittoWrite Editor</EditHeader>
      <br/>
      <p style={{ color: "#55acee"}}>
        <span id={"editor-user-area"}>{userData} -&nbsp;</span>
        <span id={"editor-time-area"}></span>
      </p>
      <br/>
      <WriteArea id={"editor-text-area"} name={"editor-text-area"} rows={20} cols={40} placeholder={"Type in your text here..."}></WriteArea>
      <SubmitButton id={"editor-text-button"} onClick={handleSubmit}>Write Tweet</SubmitButton>
      <HelpButton id={"editor-help-button"} onClick={showHelp}>Need Help?</HelpButton>
      <ConfirmText id={"editor-send-confirmation"}></ConfirmText>
      <br/>
    </EditorDiv>
  );
}

export default Editor;
