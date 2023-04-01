import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const Contactus = () => {
  return (
    <MDBContainer className='.d-flex justify-content-center flex-nowrap w-50% mx-20%'>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Contact us</p>
            <div className="grey-text">
              <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                success="right" />
              <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                success="right" />
              <MDBInput label="Subject" icon="tag" group type="text" validate error="wrong" success="right" />
              <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
            </div>
            <div className="text-center">
              <MDBBtn color="primary" type="submit">Send</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Contactus;
