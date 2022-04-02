export default (parentId, type) => {
  const parentPolyline = window.allTheConnection.find((item) => {
    return item._id === parentId && item.type === type;
  });
  let formContent;
  if (type === 'pointToPoint') {
    console.log(parentPolyline);
    formContent = ` <div class="modal-dialog">
      <div class="modal-content p-2">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                      type="button" role="tab" aria-controls="profile" aria-selected="false">Add Reseller</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                      type="button" role="tab" aria-controls="contact" aria-selected="false">Add Company</button>
              </li>
              <li class="nav-item ms-auto mt-2 mb-1" role="presentation">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </li>
          </ul>
          <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Add Reseller (OLT)</h5>
                  </div>
                  <form onsubmit="event.preventDefault(); addResellerForm();">
                      <div class="modal-body">
                          <div class="mb-2">
                              <input type="text" class="form-control" id="addLocalConnectionName"
                                  placeholder="Name">
                          </div>
                          <div class="mb-2">
                              <input type="text" class="form-control" id="addLocalConnectionOltSwitchNo"
                                  placeholder="Olt Switch No">
                          </div>
                          <div class="mb-2">
                              <input type="text" class="form-control" id="addLocalConnectionPortNo"
                                  placeholder="Port No">
                          </div>
                          <div>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="addLocalConnectionType"
                                      id="flexRadioDefault1" value="epon">
                                  <label class="form-check-label" for="flexRadioDefault1">
                                      EPON
                                  </label>
                              </div>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="addLocalConnectionType"
                                      id="flexRadioDefault2" value="gpon">
                                  <label class="form-check-label" for="flexRadioDefault2">
                                      GPON
                                  </label>
                              </div>


                              <div class=" mt-2">
                                  <select class="form-select" aria-label="Default select example"
                                      id="addLocalConnectionCoreOption">
                                      <option selected>Select Core Color</option>
                                      <option value="blue">blue</option>
                                      <option value="orange">orange</option>
                                      <option value="green">green</option>
                                      <option value="brown">brown</option>
                                      <option value="slate">slate</option>
                                      <option value="white">white</option>
                                      <option value="red">red</option>
                                      <option value="black">black</option>
                                      <option value="yellow">yellow</option>
                                      <option value="violet">violet</option>
                                      <option value="rose">rose</option>
                                      <option value="aqua">aqua</option>
                                  </select>
                              </div>

                          </div>
                      </div>
                      <div class="modal-footer">
                          <button type="submit" class="btn btn-primary">Submit</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>


                  </form>
              </div>
              <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Add Company</h5>
                  </div>
                  <form id="addPointToPoint">
                      <div class="modal-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="addPointToPointCompanyName"
                                  placeholder="Company Name">
                          </div>
                          <div class="mb-1">
                              <input type="text" class="form-control" id="addPointToPointPortNo"
                                  placeholder="Port No">
                          </div>
                      </div>
                      <div class="px-3 mb-3">
                          <select class="form-select" aria-label="Default select example"
                              id="addPointToPointCoreOptions">
                              <option selected value="">Select Core Color</option>
                              <option value="blue">blue</option>
                              <option value="orange">orange</option>
                              <option value="green">green</option>
                              <option value="brown">brown</option>
                              <option value="slate">slate</option>
                              <option value="white">white</option>
                              <option value="red">red</option>
                              <option value="black">black</option>
                              <option value="yellow">yellow</option>
                              <option value="violet">violet</option>
                              <option value="rose">rose</option>
                              <option value="aqua">aqua</option>
                          </select>
                      </div>

                      <div class="modal-footer">
                          <button type="submit" class="btn btn-primary">Submit</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>`;
  }
  //   console.log($(formContent).insertAfter('#form-area'));
  $('#form-area').append($(formContent));
  //   document.getElementById('form-area').innerHTML = formContent;

  $('#form-area').modal('show');
};
