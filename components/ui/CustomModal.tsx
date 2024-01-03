import { Modal } from "flowbite-react";
import { useState } from "react";

export default function CustomModal({
  buttonTitle,
  header,
  body1,
  body2,
  callback,
  image,
  contact,
}: {
  buttonTitle: string;
  header: string;
  body1?: string;
  body2?: string;
  callback?: any;
  image?: string;
  contact?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        {buttonTitle}
      </button>
      <Modal dismissible show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>
          <div className="flex gap-5 items-center">
            {image && (
              <div className="avatar">
                <div className="w-32 rounded-full">
                  <img src={image} alt="User Profile Photo" />
                </div>
              </div>
            )}
            {body1 && (
              <p className="text-base leading-relaxed text-black font-bold">
                {body1}
              </p>
            )}
            {body2 && (
              <p className="text-base leading-relaxed text-gray-500 ">
                {body2}
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          {callback && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsOpen(false);
                callback();
              }}
            >
              {buttonTitle}
            </button>
          )}
          {callback && (
            <button className="btn" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          )}
          {!callback && contact && (
            <a className="btn btn-primary" href={"sms:" + contact}>
              Contact Organizer
            </a>
          )}
          {!callback && (
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
