import { messages } from "../../lib/content/appData";

const AppMessage = ({ language = "da" }) => {
  const content = messages[language] || messages["da"];

  return (
    <div>
      <h4 className="text-5xl text-center font-bold text-goboatBlue dark:text-lightBlue">
        {content.title}
      </h4>
      <p className="mt-4 text-2xl text-center font-semibold text-typoPrimary dark:text-lightBlue">
        {content.subtitle}
      </p>
      <p className="mt-2 text-center text-typoSecondary dark:text-grey2">
        {content.description}
      </p>
    </div>
  );
};

export default AppMessage;
