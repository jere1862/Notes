class WelcomeController < ApplicationController
  def index
    @notes = Note.all
  end
end
