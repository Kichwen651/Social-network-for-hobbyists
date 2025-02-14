"""Create new tables

Revision ID: b8875cb425aa
Revises: 3a39c37ea980
Create Date: 2025-02-04 16:45:36.324640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b8875cb425aa'
down_revision = '3a39c37ea980'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('groups', schema=None) as batch_op:
        batch_op.alter_column('media_url',
               existing_type=sa.VARCHAR(length=500),
               type_=sa.String(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('groups', schema=None) as batch_op:
        batch_op.alter_column('media_url',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=500),
               nullable=False)

    # ### end Alembic commands ###
