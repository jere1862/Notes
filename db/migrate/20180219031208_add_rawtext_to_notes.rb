class AddRawtextToNotes < ActiveRecord::Migration[5.1]
  def change
    add_column :notes, :rawtext, :text
  end
end
