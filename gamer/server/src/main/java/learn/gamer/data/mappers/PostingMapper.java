package learn.gamer.data.mappers;

import learn.gamer.models.Posting;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PostingMapper implements RowMapper<Posting> {

    @Override
    public Posting mapRow(ResultSet rs, int rowNum) throws SQLException {
        Posting posting = new Posting();
        posting.setPostingId(rs.getInt("posting_id"));
        posting.setHeader(rs.getString("header"));
        posting.setDescription(rs.getString("`description`"));
        posting.setDatePosted(rs.getDate("date_posted").toLocalDate());

        GameMapper gameMapper = new GameMapper();
        posting.setGame(gameMapper.mapRow(rs,rowNum));
        return posting;
    }
}
