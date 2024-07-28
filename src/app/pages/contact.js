import Index from './index';

const Contact = () => (
  <div>
    <p>This is the CONTACT page</p>
  </div>
);

Contact.getInitialProps = async ctx => {
  return { store: ctx.store };
};

export default Contact;
