import coreColor from '../utility/coreColor.js';

export default (parentId, type) => {
  const parentPolyline = window.allTheConnection.find((item) => {
    return item._id === parentId && item.type === type;
  });
  let formContent;
  if (type === 'newPointToPoint' && parentId === null) {
    formContent = `<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add pointToPoint Connection</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onsubmit="event.preventDefault(); addPointToPointForm();">
            <div class="modal-body">
                <div class="mb-3">
                    <input type="text" class="form-control" id="mainConnectionName" placeholder="Enter Name:">
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Cable Core:</label>
                    <select class="form-select" id="mainConnectionCoreOptions">
                        <option selected value="">Choose...</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="24">24</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </form>
    </div>
</div>`;
  } else if (type === 'pointToPoint') {
    const coreColors = coreColor.slice(0, parentPolyline.totalCore);

    const colors = coreColors.map((item) => {
      const foundedColor = parentPolyline.childrens.find((child) => {
        return child.color === item.colorName;
      });
      return foundedColor
        ? ''
        : `<option value="${item.colorName}">${item.colorName}</option>`;
    });

    formContent = ` <div class="modal-dialog">
    <div class="modal-content p-2">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                    type="button" role="tab" aria-controls="profile" aria-selected="false">Add Reseller</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                    role="tab" aria-controls="contact" aria-selected="false">Add Company</button>
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
                            <input type="text" class="form-control" id="addLocalConnectionName" placeholder="Name">
                        </div>
                        <div class="mb-2">
                            <input type="text" class="form-control" id="addLocalConnectionOltSwitchNo"
                                placeholder="Olt Switch No">
                        </div>
                        <div class="mb-2">
                            <input type="text" class="form-control" id="addLocalConnectionPortNo" placeholder="Port No">
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
                                    <option selected value="">Select Core Color</option>
                                    ${colors.join('')}
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
                    <h5 class="modal-title">Add Company</h5>
                </div>
                <form onsubmit="event.preventDefault(); addCompanyForm();">
                    <div class="modal-body">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="addPointToPointCompanyName"
                                placeholder="Company Name">
                        </div>
                        <div class="mb-1">
                            <input type="text" class="form-control" id="addPointToPointPortNo" placeholder="Port No">
                        </div>
                    </div>
                    <div class="px-3 mb-3">
                        <select class="form-select" aria-label="Default select example" id="addPointToPointCoreOptions">
                            <option selected value="">Select Core Color</option>
                            ${colors.join('')}
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
  } else if (type === 'reseller' || type === 'localFiber') {
    formContent = `
<div class="modal-dialog">
    <div class="modal-content p-2">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#splitter" type="button" role="tab"
                    aria-controls="home" aria-selected="true">Add Splitter</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                    role="tab" aria-controls="profile" aria-selected="false">Add Local Fiber</button>
            </li>
            <li class="nav-item ms-auto mt-2 mb-1" role="presentation">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="splitter" role="tabpanel">
                <div class="modal-header">
                    <h5 class="modal-title">Add Local Splitter</h5>
                </div>
                <form onsubmit="event.preventDefault(); addSplitterConnection();">
                    <div class="modal-body">
                        <div class="mb-2">
                            <input type="text" class="form-control" id="addLocalSplitterName" placeholder="Name">
                        </div>

                        <div class="mb-2 mt-1">
                            <input type="text" class="form-control" id="addLocalSplitterPortNo"
                                placeholder="Olt Port No">
                        </div>

                        ${
                          type === 'localFiber'
                            ? `<div class=" mt-2">
                            <select class="form-select" aria-label="Default select example"
                                id="addLocalSplitterConnection">
                                <option selected value="">Select Core Color</option>
                                ${(() => {
                                  const coreColors = coreColor.slice(
                                    0,
                                    parentPolyline.totalCore
                                  );

                                  const colors = coreColors.map((item) => {
                                    const foundedColor = (
                                      parentPolyline.mainLocalFiber
                                        ? parentPolyline.mainLocalFiber
                                            .childrens
                                        : parentPolyline.childrens
                                    ).find((child) => {
                                      return child.color === item.colorName;
                                    });
                                    return foundedColor
                                      ? ''
                                      : `<option value="${item.colorName}">${item.colorName}</option>`;
                                  });
                                  return colors.join('');
                                })()}
                            </select>
                        </div>`
                            : ''
                        }
                        <div>
                            <div class="mt-2">
                                <select class="form-select" aria-label="Default select example"
                                    id="addLocalSplitterType">
                                    <option selected>Select Splitter Type</option>
                                    <option value="2">1/2</option>
                                    <option value="4">1/4</option>
                                    <option value="8">1/8</option>
                                    <option value="16">1/16</option>
                                    <option value="32">1/32</option>
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

            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add LocalFiber</h5>
                </div>
                <form onsubmit="event.preventDefault(); addLocalFiberConnection();">
                    <div class="modal-body">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="addLocalFiberConnectionName"
                                placeholder="Enter Name:">
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelect01">Cable Core:</label>
                            <select class="form-select" id="addLocalFiberConnectionCoreOptions">
                                <option selected value="">Choose...</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="12">12</option>
                                <option value="16">16</option>
                                <option value="24">24</option>
                            </select>
                        </div>
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
  } else if (type === 'splitter') {
    formContent = `
<div class="modal-dialog">
    <div class="modal-content p-2">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#homeConnection" type="button"
                    role="tab" aria-controls="home" aria-selected="true">Add Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#splitter" type="button"
                    role="tab" aria-controls="splitter" aria-selected="false">Add Splitter</button>
            </li>
            <li class="nav-item ms-auto mt-2 mb-1" role="presentation">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="homeConnection" role="tabpanel">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Home Connection</h5>
                </div>
                <form onsubmit="event.preventDefault(); addHomeConnection();">
                    <div class="modal-body">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="addLocalHomeConnectionName" placeholder="Name">
                        </div>
                        <div class="mb-1">
                            <input type="text" class="form-control" id="addLocalHomeConnectionOnuNo"
                                placeholder="ONU Number">
                        </div>
                    </div>
                    <div class="px-3 mb-3">
                        <select class="form-select" aria-label="Default select example"
                            id="addLocalHomeConnectionOptions">
                            <option selected value="">Select Core Color</option>
                            ${(() => {
                              const coreColors = coreColor.slice(
                                0,
                                parentPolyline.splitterLimit
                              );

                              const colors = coreColors.map((item) => {
                                const foundedColor =
                                  parentPolyline.childrens.find((child) => {
                                    return child.color === item.colorName;
                                  });
                                return foundedColor
                                  ? ''
                                  : `<option value="${item.colorName}">${item.colorName}</option>`;
                              });
                              return colors.join('');
                            })()}
                        </select>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>

            <div class="tab-pane fade" id="splitter" role="tabpanel" aria-labelledby="profile-tab">
                <div class="modal-header">
                    <h5 class="modal-title">Add Local Splitter</h5>
                </div>
                <form onsubmit="event.preventDefault(); addSplitterConnection();">
                    <div class="modal-body">
                        <div class="mb-2">
                            <input type="text" class="form-control" id="addLocalSplitterName" placeholder="Name">
                        </div>

                        <div class=" mt-2">
                            <select class="form-select" aria-label="Default select example"
                                id="addLocalSplitterConnection">
                                <option selected value="">Select Core Color</option>
                                ${(() => {
                                  const coreColors = coreColor.slice(
                                    0,
                                    parentPolyline.splitterLimit
                                  );

                                  const colors = coreColors.map((item) => {
                                    const foundedColor =
                                      parentPolyline.childrens.find((child) => {
                                        return child.color === item.colorName;
                                      });
                                    return foundedColor
                                      ? ''
                                      : `<option value="${item.colorName}">${item.colorName}</option>`;
                                  });
                                  return colors.join('');
                                })()}
                            </select>
                        </div>

                        <div>
                            <div class=" mt-2">
                                <select class="form-select" aria-label="Default select example"
                                    id="addLocalSplitterType">
                                    <option selected>Select Splitter Type</option>
                                    <option value="2">1/2</option>
                                    <option value="4">1/4</option>
                                    <option value="8">1/8</option>
                                    <option value="16">1/16</option>
                                    <option value="32">1/32</option>
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
        </div>
    </div>
</div>`;
  } else {
    formContent = `
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Please Select any connection first</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
</div>`;
  }

  document.getElementById('form-area').innerHTML = '';
  $('#form-area').append($(formContent));
  $('#form-area').modal('show');
};
