class Note < ApplicationRecord
    validates :title, presence: true, length: {minimum: 1}
    serialize :rawtext
end
