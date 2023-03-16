import "../assets/styles/form.css";
import LoadingSpinner from "./LoadingSpinner";

import { useState, useEffect } from "react";

const Form = () => {
  const stepDescription = {
    1: [
      "Personal info",
      "Please provide your name, email address, and phone number.",
    ],
    2: [
      "Select your plan",
      "You have the option of monthly or yearly billing.",
    ],
    3: ["Pick add-ons", "Add-ons help enhance your gaming experience."],
    4: ["Finishing up", "Double-check everything looks OK before confirming."],
  };

  const [monthlyPayment, setMonthlyPayment] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    addons: {
      onlineService: false,
      largerStorage: false,
      customizableProfile: false,
    },
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [actualStep, setActualStep] = useState(1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //added handling for checkbox/addons
    if (event.target.type === "checkbox") {
      setForm((prevForm) => ({
        ...prevForm,
        addons: { ...prevForm.addons, [name]: !form.addons[name] },
      }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const changeStep = (step) => {
    setIsLoading(true);
    setActualStep(step);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const planPrice =
      (form.plan === "Arcade" ? 9 : form.plan === "Advanced" ? 12 : 15) *
      (monthlyPayment ? 1 : 10);

    const addonsPrice =
      ((form.addons.onlineService ? 1 : 0) +
        (form.addons.largerStorage ? 2 : 0) +
        (form.addons.customizableProfile ? 2 : 0)) *
      (monthlyPayment ? 1 : 10);

    setTotalPrice(planPrice + addonsPrice);
  }, [form, monthlyPayment]);

  return (
    <div className="form-container">
      <div className="form-side-bar">
        <div>
          <p
            className={
              actualStep === 1
                ? "form-side-bar-number active"
                : "form-side-bar-number"
            }
          >
            1
          </p>
          <p>
            <span>STEP 1</span> YOUR INFO
          </p>
        </div>
        <div>
          <p
            className={
              actualStep === 2
                ? "form-side-bar-number active"
                : "form-side-bar-number"
            }
          >
            2
          </p>
          <p>
            <span>STEP 2</span> SELECT PLAN
          </p>
        </div>
        <div>
          <p
            className={
              actualStep === 3
                ? "form-side-bar-number active"
                : "form-side-bar-number"
            }
          >
            3
          </p>
          <p>
            <span>STEP 3</span> ADD-ONS
          </p>
        </div>
        <div>
          <p
            className={
              actualStep === 4
                ? "form-side-bar-number active"
                : "form-side-bar-number"
            }
          >
            4
          </p>
          <p>
            <span>STEP 4</span> SUMMARY
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="form-main-container">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="form-main-container">
          {/* Step description, depends on actual step */}
          <p>
            <span>{stepDescription[actualStep]?.[0]}</span>
            {stepDescription[actualStep]?.[1]}
          </p>
          {/* Actual step */}
          {actualStep === 1 && (
            <form
              className="form-your-info"
              id="form-your-info"
              onSubmit={(e) => {
                e.preventDefault();
                changeStep(2);
              }}
            >
              <label htmlFor="input-name">Name</label>
              <input
                id="input-name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                type="text"
                placeholder="e.g. Stephen King"
                maxLength={80}
                required
              ></input>

              <label htmlFor="input-email">Email Address</label>
              <input
                id="input-email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                type="email"
                placeholder="e.g. stephenking@lorem.com"
                maxLength={80}
                required
              ></input>
              <label htmlFor="input-phone">Phone Number</label>
              <input
                id="input-phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                type="tel"
                placeholder="e.g. +1 234 567 890"
                required
              ></input>
            </form>
          )}

          {actualStep === 2 && (
            <div className="form-select-plan">
              <div>
                <div>
                  <input
                    type="radio"
                    id="plan-1"
                    name="plan"
                    value="Arcade"
                    onChange={handleInputChange}
                    checked={form.plan === "Arcade"}
                  />
                  <label htmlFor="plan-1">
                    Arcade
                    {monthlyPayment ? (
                      <p>
                        <span>$9/mo</span>
                      </p>
                    ) : (
                      <p>
                        <span>$90/yr</span>2 months free
                      </p>
                    )}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="plan-2"
                    name="plan"
                    value="Advanced"
                    onChange={handleInputChange}
                    checked={form.plan === "Advanced"}
                  />
                  <label htmlFor="plan-2">
                    Advanced
                    {monthlyPayment ? (
                      <p>
                        <span>$12/mo</span>
                      </p>
                    ) : (
                      <p>
                        <span>$120/yr</span>2 months free
                      </p>
                    )}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="plan-3"
                    name="plan"
                    value="Pro"
                    onChange={handleInputChange}
                    checked={form.plan === "Pro"}
                  />
                  <label htmlFor="plan-3">
                    Pro
                    {monthlyPayment ? (
                      <p>
                        <span>$15/mo</span>
                      </p>
                    ) : (
                      <p>
                        <span>$150/yr</span>2 months free
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label>
                  Monthly
                  <input
                    type="checkbox"
                    onChange={() => {
                      setMonthlyPayment(!monthlyPayment);
                    }}
                    checked={monthlyPayment}
                  />
                  Yearly
                </label>
              </div>
            </div>
          )}

          {actualStep === 3 && (
            <div className="form-add-ons">
              <div>
                <input
                  type="checkbox"
                  id="online-services"
                  name="onlineService"
                  value={"Online service"}
                  onChange={handleInputChange}
                  checked={form.addons.onlineService}
                />
                <label htmlFor="online-services">
                  <div>
                    <p>
                      <b>Online service</b>Access to multiplayer games
                    </p>
                    <p>{monthlyPayment ? "+$1/mo" : "+$10/yr"}</p>
                  </div>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="larger-storage"
                  name="largerStorage"
                  value="Larger storage"
                  onChange={handleInputChange}
                  checked={form.addons.largerStorage}
                />
                <label htmlFor="larger-storage">
                  <div>
                    <p>
                      <b>Larger storage</b>Extra 1TB of cloud save
                    </p>
                    <p>{monthlyPayment ? "+$2/mo" : "+$20/yr"}</p>
                  </div>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="custom-profile"
                  name="customizableProfile"
                  value="Customizable profile"
                  onChange={handleInputChange}
                  checked={form.addons.customizableProfile}
                />
                <label htmlFor="custom-profile">
                  <div>
                    <p>
                      <b>Customizable Profile</b>Custom theme on your profile
                    </p>
                    <p>{monthlyPayment ? "+$2/mo" : "+$20/yr"}</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {actualStep === 4 && (
            <div className="form-summary">
              <div>
                <div>
                  <div>
                    <div>
                      <p>
                        {form.plan} {monthlyPayment ? "(Monthly)" : "(Yearly)"}
                      </p>
                      <button onClick={() => changeStep(2)}>Change</button>
                    </div>
                    <p>
                      $
                      {(form.plan === "Arcade"
                        ? 9
                        : form.plan === "Advanced"
                        ? 12
                        : 15) * (monthlyPayment ? 1 : 10)}
                      /{monthlyPayment ? "mo" : "yr"}
                    </p>
                  </div>
                  <div>
                    {form.addons.onlineService ? (
                      <div>
                        <p>Online service</p>
                        <p>{monthlyPayment ? "+$1/mo" : "+$10/yr"}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                    {form.addons.largerStorage ? (
                      <div>
                        <p>Larger Storage</p>
                        <p>{monthlyPayment ? "+$2/mo" : "+$20/yr"}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                    {form.addons.customizableProfile ? (
                      <div>
                        <p>Customizable profile</p>
                        <p>{monthlyPayment ? "+$2/mo" : "+$20/yr"}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div>
                  <p>Total {monthlyPayment ? "(per month)" : "(per year)"}</p>
                  <p>
                    ${totalPrice}/{monthlyPayment ? "mo" : "yr"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {actualStep === 5 && (
            <div className="form-success">
              <div>
                <span>Thank you!</span>{" "}
                <p>
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            </div>
          )}

          {/* Rendering navigation buttons, depends on actual step */}
          {actualStep === 5 ? (
            <></>
          ) : (
            <div className="form-navigation-buttons">
              {actualStep === 1 ? (
                <div></div>
              ) : (
                <button
                  className="back-button"
                  onClick={() => changeStep(actualStep - 1)}
                >
                  Go Back
                </button>
              )}

              {actualStep === 4 ? (
                <button
                  className="button confirm-button"
                  onClick={() => {
                    console.log(
                      `User sent to API!\n
                    Name: ${form.name}\n
                    Email: ${form.email}\n
                    Phone: ${form.phone}\n
                    Total price: ${totalPrice}$ per ${
                        monthlyPayment ? "month" : "year"
                      }\n
                    Whole object:`,
                      form
                    );
                    changeStep(5);
                  }}
                >
                  Confirm
                </button>
              ) : actualStep === 1 ? (
                <button className="button" form="form-your-info" type="submit">
                  Next Step
                </button>
              ) : (
                <button
                  className="button"
                  onClick={() => changeStep(actualStep + 1)}
                >
                  Next Step
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
