class WelcomeController < ApplicationController
  def index
    @notes = Note.all

    puts @notes.inspect
  end
end
