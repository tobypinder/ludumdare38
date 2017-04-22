require 'test_helper'

class Ld38ControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ld38_index_url
    assert_response :success
  end

end
