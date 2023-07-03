package learn.gamer.data.mappers;

import learn.gamer.models.MatchSent;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MatchSentMapper implements RowMapper<MatchSent> {

    @Override
    public MatchSent mapRow(ResultSet rs, int rowNum) throws SQLException {
        MatchSent matchSent = new MatchSent();
        matchSent.setDateMatchSent(rs.getDate("date_match").toLocalDate());

        matchSent.setGamerSenderId(rs.getInt("gamer_sender_id"));
        GamerMapper gamerMapper = new GamerMapper();
        matchSent.setGamerReceiver(gamerMapper.mapRow(rs, rowNum));

        int gamerReceiverId = rs.getInt("gamer_receiver_id");
//        matchSent.setGamerReceiver(gamerMapper.mapRow(rs, rowNum));

        return matchSent;
    }
}
