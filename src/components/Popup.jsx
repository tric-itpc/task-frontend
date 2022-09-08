import React, { useEffect } from "react";

const Popup = function ({
  name,
  isOpen,
  idPopup,
  onClose,
  children,
  onSubmit,
}) {
  // =======================================================================
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen && "popup__is-opened"}`} id={idPopup}>
      <form name={name} className='popup__container' onSubmit={onSubmit}>
        <div className='popup__close-btn'>
          <button
            type='button'
            className='popup__close'
            aria-label='Кнопка закрытия формы'
            onClick={onClose}></button>
        </div>
        {children}
      </form>
    </div>
  );
};

export default Popup;
