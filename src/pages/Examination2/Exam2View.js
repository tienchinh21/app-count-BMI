import React, { Fragment } from "react";

const Exam2View = ({ hookForm, data }) => {
  // Chia bố cục

  return (
    <div className="row">
      <div className="col-12">
        <h1>Examination</h1>
      </div>

      <div className="col-12">
        {data.map((item, index) => (
          <Fragment key={item.id}>
            <div className="mb-4">
              <div className="font-weight-bold mb-2">
                {index + 1}. {item.question}
              </div>
              <div className="d-flex gap justify-content-center">
                {item.answers.map((x, indexAnswer) => (
                  <div
                    className="custom-control custom-radio mr-2"
                    key={x.label}
                  >
                    <input
                      type="radio"
                      id={x.label + item.question}
                      name={item.question}
                      className="custom-control-input"
                      value={x.id}
                      onChange={e => {
                        const answers = item.answers;
                        hookForm.setValue(`data.[${index}].answers`, answers.map(m => ({
                          ...m,
                          isSelected: x.id === m.id ? true : false
                        })));

                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={x.label + item.question}
                    >
                      {x.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}

        <div className="col-12">
          <button className="btn btn-primary" onClick={e => {
            hookForm.handleSubmit(({ data }) => {
              let point = 0;

              data.forEach(ques => {
                const answer = ques.answers.find(x => x.isSelected);
                if (answer.isCorrect) point = point + 20;
              });

              console.log(point);

            })()
          }}>Submit</button>
        </div>
      </div>
    </div >
  )
}

export default Exam2View
