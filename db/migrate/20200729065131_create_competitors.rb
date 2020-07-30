class CreateCompetitors < ActiveRecord::Migration[6.0]
  def change
    create_table :competitors do |t|
      t.string :origin
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
