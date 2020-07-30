class Competitor < ApplicationRecord
  belongs_to :shop
  validates :origin, presence: true
end
