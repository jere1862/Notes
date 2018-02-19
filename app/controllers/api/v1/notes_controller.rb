class Api::V1::NotesController < Api::V1::BaseController   
    def index
        @notes = Note.all
        #respond_with @notes
        respond_with :api, :v1
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
       puts "test"
        if @note.update(note_params)
          redirect_to @note
        else
          render 'edit'
        end
    end

    def create
        @note = Note.new(note_params)

        if @note.save
            redirect_to @note
        else
            render 'new'
        end
    end

    def destroy
        @note = Note.find(params[:id])
        @note.destroy

        redirect_to notes_path
    end

    private
        def note_params
            params.require(:note).permit(:title, :text)
        end
end
