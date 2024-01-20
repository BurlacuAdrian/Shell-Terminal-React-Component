import data from './data.json'
const EMAIL = data.email
const GITHUB = data.github
const LINKEDIN = data.linkedin

const copyToClipboard = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    setClipboardNotification(true)
    setTimeout(() => {
      setClipboardNotification(false)
    }, 1500)
  } catch (err) {
    console.error('Unable to copy to clipboard:', err);
  }
};

const renderContact = () => {
  return (
    <>
      <pre className='help-command-item'> E-mail</pre>
      <pre className=''>   <a href={`mailto:${EMAIL}`}>{EMAIL}</a><span onClick={() => copyToClipboard(EMAIL)} className='copy-button'>  Copy</span></pre>
      <pre className='help-command-item'> GitHub</pre>
      <pre className=''>   <a href={GITHUB}>{GITHUB}</a><span onClick={() => copyToClipboard(GITHUB)} className='copy-button'>  Copy</span></pre>
      <pre className='help-command-item'> LinkedIn</pre>
      <pre className=''>   <a href={LINKEDIN}>{LINKEDIN}</a><span onClick={() => copyToClipboard(LINKEDIN)} className='copy-button'>  Copy</span></pre>
    </>
  );
}

export default renderContact