package learn.gamer.data;

import learn.gamer.models.Match;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MatchJdbcTemplateRepository {
    private final JdbcTemplate jdbcTemplate;
    public MatchJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    public List<Match> findAll() {
//
//    }
//
//    public List<Match> findBy
}
