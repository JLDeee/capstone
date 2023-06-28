package learn.gamer.data;

import learn.gamer.data.mappers.MatchMapper;
import learn.gamer.models.Match;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class MatchJdbcTemplateRepository implements MatchRepository {
    private final JdbcTemplate jdbcTemplate;
    public MatchJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Match> findAll() {
        final String sql = "select match_id, user_id_one, user_id_two, date_match "
                + "from `match` "
                + "order by date_match desc;";
        return jdbcTemplate.query(sql, new MatchMapper());
    }

    @Override
    public List<Match> findYouMatched(int appUserId1) {
        // note: the first user (user_id_one) is "you", the user_id_two is whoever you matched with)
        final String sql = "select match_id, user_id_one, user_id_two, date_match "
                + "from `match` "
                + "where user_id_one = ? "
                + "order by date_match desc;";
        return jdbcTemplate.query(sql, new MatchMapper(), appUserId1);
    }

    @Override
    public List<Match> findMatchedYou(int appUserId2) {
        final String sql = "select match_id, user_id_one, user_id_two, date_match "
                + "from `match` "
                + "where user_id_two = ? "
                + "order by date_match desc;";
        return jdbcTemplate.query(sql, new MatchMapper(), appUserId2);
    }

    @Override
    @Transactional
    public Match add(Match match) {
        final String sql = "insert into `match` (user_id_one, user_id_two, date_match) "
                + "values (?,?,?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, match.getAppUserId1());
            ps.setInt(2, match.getAppUserId2());
            ps.setDate(3, match.getDateMatched() == null ? null : Date.valueOf(match.getDateMatched()));
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        match.setMatchId(keyHolder.getKey().intValue());
        return match;
    }

    @Override
    @Transactional
    public boolean deleteById(int matchId) {
        final String sql = "delete from `match` where match_id = ?;";
        return jdbcTemplate.update(sql, matchId) > 0;
    }
}
