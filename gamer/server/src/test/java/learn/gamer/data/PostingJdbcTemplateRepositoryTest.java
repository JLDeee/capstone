package learn.gamer.data;

import learn.gamer.models.Posting;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PostingJdbcTemplateRepositoryTest {

    @Autowired
    private PostingJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp(){
        knownGoodState.set();
    }

    //READ - happy
    @Test
    void shouldFindAll() throws DataAccessException {
        List<Posting> result = repository.findAll();
        assertNotNull(result);
        assertTrue(result.size() >= 10);
//
//        Posting posting = new Posting();
//        posting.setPostingId(12);
//        posting.setHeader("Looking for teammate for duo queue");
//        posting.setDescription("Need someone to help me get through this dungeon, level 25+ only");
//        posting.setDatePosted(LocalDate.of(2023, 06, 27));
//        posting.setGameId(2);
//        posting.setAppUserId(1);
//
//        assertTrue(result.contains(posting));
    }

    @Test
    void shouldFindById() throws DataAccessException {
        Posting result = repository.findById(1);
        assertNotNull(result);
    }

    @Test
    void shouldFindByUsername() throws DataAccessException {
        List<Posting> result = repository.findByUsername("maria@alcantara.com");
        assertNotNull(result);
        assertTrue(result.size() == 2);
    }

    @Test
    void shouldFindByGameTitle() throws DataAccessException {
        List<Posting> result = repository.findByGameTitle("Sims 4");
        assertNotNull(result);
        assertTrue(result.size() == 4);
    }

    @Test
    void shouldFindByDate() throws DataAccessException {
        List<Posting> result = repository.findByDate(LocalDate.of(2023, 06, 27));
        assertNotNull(result);
    }

    //READ - unhappy
    @Test
    void shouldNotFindByInvalidId() throws DataAccessException {
        Posting result = repository.findById(999);
        assertNull(result);
    }

    @Test
    void shouldNotFindByInvalidUsername() throws DataAccessException {
        List<Posting> result = repository.findByUsername("invalid");
        assertEquals(0, result.size());
    }

    @Test
    void shouldNotFindByInvalidGameTitle() throws DataAccessException {
        List<Posting> result = repository.findByGameTitle("Invalid");
        assertEquals(0, result.size());
    }

    @Test
    void shouldNotFindByFutureDate() throws DataAccessException {
        List<Posting> result = repository.findByDate(LocalDate.of(2024, 06, 27));
        assertEquals(0, result.size());
    }

    //CREATE - happy
    @Test
    void shouldCreate() throws DataAccessException {
        Posting posting = new Posting();
        posting.setHeader("Looking for teammate for duo queue");
        posting.setDescription("Need someone to help me get through this dungeon, level 25+ only");
        posting.setDatePosted(LocalDate.of(2023, 06, 27));
        posting.setGameId(2);
        posting.setAppUserId(1);

        Posting result = repository.create(posting);

        assertNotNull(result);
        assertEquals(12, result.getPostingId());
    }


    //UPDATE - happy
    @Test
    void shouldUpdate() throws DataAccessException {
        Posting posting = new Posting();
        posting.setHeader("Looking for two teammates for trio queue");
        posting.setDescription("Need two people to help me get through this dungeon, level 25+ only");
        posting.setDatePosted(LocalDate.of(2023, 06, 27));
        posting.setGameId(2);
        posting.setAppUserId(1);

        assertTrue(repository.update(posting));
    }


    //DELETE - happy
    @Test
    void shouldDeleteById() throws DataAccessException {
        assertTrue(repository.deleteById(5));
    }

    //DELETE - unhappy
    @Test
    void shouldNotDeleteByInvalidId() throws DataAccessException {
        assertFalse(repository.deleteById(999));
    }

}