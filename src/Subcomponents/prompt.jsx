import data from './data.json'
const promptUsername = data["prompt-username"]
const promptHostname = data["prompt-hostname"]

const renderPrompt = () => {
  const promptStyles = {
    portfolio: { color: '#91fb5f' },
    at: { color: '#808080' },
    test: { color: '#91fb5f' },
    colon: { color: '#D3D3D3' },
    tilde: { color: '#5f91fb' },
    dollar: { color: '#D3D3D3' },
  };

  return (
    <span className='prompt'>
      <span style={promptStyles.portfolio}>{promptUsername}</span>
      <span style={promptStyles.at}>@</span>
      <span style={promptStyles.test}>{promptHostname}</span>
      <span style={promptStyles.colon}>:</span>
      <span style={promptStyles.tilde}>~</span>
      <span style={promptStyles.dollar}>$</span>
      <span>&nbsp;</span>
    </span>
  );
};

export default renderPrompt