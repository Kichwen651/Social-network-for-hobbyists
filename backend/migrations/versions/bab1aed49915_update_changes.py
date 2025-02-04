"""update changes

Revision ID: bab1aed49915
Revises: 0ce00c612366
Create Date: 2025-02-04 14:49:34.665470

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bab1aed49915'
down_revision = '0ce00c612366'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('groups', schema=None) as batch_op:
        batch_op.add_column(sa.Column('media_url', sa.String(length=500), nullable=True))

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('media_url')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('media_url', sa.VARCHAR(length=500), autoincrement=False, nullable=True))

    with op.batch_alter_table('groups', schema=None) as batch_op:
        batch_op.drop_column('media_url')

    # ### end Alembic commands ###
