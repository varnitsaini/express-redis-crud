function addValueFields() {

    $(".value-fields").append('<label class="control-label col-sm-1" for="redis-hash-value">Field:</label> <div class="col-sm-4"> <input type="text" class="form-control" id="redis-hash-value" placeholder="Field" name="redis-hash[]"> </div> <label class="control-label col-sm-2" for="redis-hash-value">Value:</label> <div class="col-sm-4"> <input type="text" class="form-control" id="redis-hash-value" placeholder="Value" name="redis-hash[]"> </div> <div class="col-sm-1"> <button type="button" class="btn btn-default" onclick="addValueFields()">+</button> </div>');
}