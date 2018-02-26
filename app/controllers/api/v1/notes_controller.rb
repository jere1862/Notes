require 'json'
class Api::V1::NotesController < Api::V1::BaseController   
    def index
        @notes = Note.all
        respond_with :api, :v1, @notes
    end

    def new
        @note = Note.new
    end

    def show
        @note = Note.find(params[:id])
    end

    def edit
        @note = Note.find(params[:id])
    end

    def update
        @note = Note.find(params[:id])
        @note.update(note_params)
        respond_with @note
    end

    def create
        @note = Note.new(note_params)
        @note.save
        puts @note.inspect
        respond_with @note
    end

    def destroy
        @note = Note.find(params[:id])
        @note.destroy

        redirect_to notes_path
    end

    private
        def note_params
            params.require(:note).permit(:title, :text, rawtext: {})
        end
end
